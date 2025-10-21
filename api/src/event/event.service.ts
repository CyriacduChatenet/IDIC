/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

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
      console.error('Error creating event:', err);
      throw new ForbiddenException(
        `You do not have PERMISSION to create a STRAPI_EVENT`,
      );
    }
  }

  findAll(): Promise<StrapiApiFindAllResponse<Event>> {
    try {
      return this.strapiService.getAllData('events', '*');
    } catch (err) {
      console.error('Error fetching events:', err);
      throw new NotFoundException(`No STRAPI_EVENTS found`);
    }
  }

  findOne(id: string): Promise<StrapiApiFindOneResponse<Event>> {
    try {
      return this.strapiService.getDataById(`events/${id}`, '*');
    } catch (err) {
      console.error('Error fetching event:', err);
      throw new NotFoundException(`STRAPI_EVENT with ID ${id} not found`);
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
      console.error('Error updating event:', err);
      throw new ForbiddenException(
        `You do not have permission to update STRAPI_EVENT with ID ${id} and CRDENTIALS ${JSON.stringify(updateEventDto)}`,
      );
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
      console.error('Error deleting event:', err);
      throw new ForbiddenException(
        `You do not have permission to delete STRAPI_EVENT with ID ${id}`,
      );
    }
  }
}
