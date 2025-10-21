/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { StrapiService } from '../strapi/strapi.service';
import { ClubService } from '../club/club.service';
import { Club } from '../club/entities/club.entity';
import { Event } from './entities/event.entity';
import {
  StrapiApiDeleteResponse,
  StrapiApiFindAllResponse,
  StrapiApiFindOneResponse,
  StrapiApiUpdateResponse,
} from '../strapi/interfaces/strapi-api-response.interface';
import { handleAxiosError } from '../config/utils/axios-error.utils';

@Injectable()
export class EventService {
  constructor(
    private readonly strapiService: StrapiService,
    private readonly clubService: ClubService,
  ) {}

  async create(createEventDto: CreateEventDto) {
    try {
      if (createEventDto.club !== null) {
        const strapiClub = (await this.clubService.findOne(
          createEventDto.club,
        )) as { data: Club };

        const strapiEvent = (await this.strapiService.postData('events', {
          data: createEventDto,
        })) as { data: Event };

        const strapiClubEventIds: string[] = [];

        strapiClub.data.events.forEach((event: Event) =>
          strapiClubEventIds.push(event.documentId),
        );

        const updateStrapiClub = (await this.clubService.update(
          strapiClub.data.documentId,
          {
            events: [...strapiClubEventIds, strapiEvent.data.documentId],
          },
        )) as { data: Club };

        return { strapiEvent, updateStrapiClub };
      } else {
        return await this.strapiService.postData('events', {
          data: createEventDto,
        });
      }
    } catch (err) {
      handleAxiosError(err, 'creating event');
    }
  }

  findAll(): Promise<StrapiApiFindAllResponse<Event>> {
    try {
      return this.strapiService.getAllData('events', '*');
    } catch (err) {
      handleAxiosError(err, 'fetching events');
    }
  }

  findOne(id: string): Promise<StrapiApiFindOneResponse<Event>> {
    try {
      return this.strapiService.getDataById(`events/${id}`, '*');
    } catch (err) {
      handleAxiosError(err, `fetching event with ID ${id}`);
    }
  }

  update(
    id: string,
    updateEventDto: UpdateEventDto,
  ): Promise<StrapiApiUpdateResponse<Event>> {
    try {
      return this.strapiService.updateData(`events/${id}`, {
        data: updateEventDto,
      });
    } catch (err) {
      handleAxiosError(err, `updating event with ID ${id}`);
    }
  }

  async remove(id: string): Promise<StrapiApiDeleteResponse<Event>> {
    try {
      const strapiEvent = (await this.findOne(id)) as { data: Event };
      const strapiEventClubId = strapiEvent.data.club.documentId;
      const strapiClub = (await this.clubService.findOne(
        strapiEventClubId,
      )) as { data: Club };

      const strapiClubEventIds: string[] = [];
      strapiClub.data.events.forEach((event: Event) =>
        event.documentId !== id
          ? strapiClubEventIds.push(event.documentId)
          : null,
      );
      await this.clubService.update(strapiClub.data.documentId, {
        events: strapiClubEventIds,
      });
      await this.strapiService.deleteData(`events/${id}`);

      return { data: strapiEvent.data };
    } catch (err) {
      handleAxiosError(err, `deleting event with ID ${id}`);
    }
  }
}
