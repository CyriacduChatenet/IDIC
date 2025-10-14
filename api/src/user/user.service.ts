/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StrapiService } from '../strapi/strapi.service';
import { User } from './entity/user.entity';
import { CustomerStripe } from '../stripe/classes/customer.stripe';
import { Role } from '../config/enum/role.enum';
import { PlayerService } from '../player/player.service';
import { Player } from '../player/entity/player.entity';
import { ClubService } from '../club/club.service';
import { Club } from 'src/club/entities/club.entity';
import { SponsorService } from 'src/sponsor/sponsor.service';
import { Sponsor } from 'src/sponsor/entities/sponsor.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly strapiService: StrapiService,
    private readonly customerStripeService: CustomerStripe,
    private readonly playerService: PlayerService,
    private readonly clubService: ClubService,
    private readonly sponsorService: SponsorService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const strapiUser = (await this.strapiService.postData(
        'users',
        createUserDto,
      )) as User;

      const stripeCustomer = await this.customerStripeService.createCustomer(
        strapiUser.email,
        strapiUser.username,
      );

      if (!stripeCustomer) {
        throw new BadRequestException(
          `Failed to create STRIPE_CUSTOMER with EMAIL ${strapiUser.email} and NAME ${strapiUser.username}`,
        );
      }

      switch (createUserDto.role) {
        case Role.Player:
          console.log('create player');
          const newStrapiPlayer = (await this.playerService.create({
            first_name: createUserDto.first_name ?? '',
            last_name: createUserDto.last_name ?? '',
            birth_date: createUserDto.birth_date ?? new Date(),
            phone: createUserDto.phone ?? '',
            address: createUserDto.address ?? '',
          })) as { data: Player };

          const updatedStrapiUserPlayer = (await this.update(strapiUser.id, {
            stripe_customer_id: stripeCustomer.id,
            player: `${newStrapiPlayer.data.id}`,
          })) as User;

          return { updatedStrapiUserPlayer, stripeCustomer };
        case Role.Club:
          console.log('create club');
          const newStrapiClub = (await this.clubService.create({
            name: createUserDto.first_name ?? '',
            address: createUserDto.address ?? '',
            phone: createUserDto.phone ?? '',
            email: createUserDto.email ?? '',
          })) as { data: Club };

          const updatedStrapiUserClub = (await this.update(strapiUser.id, {
            stripe_customer_id: stripeCustomer.id,
            club: `${newStrapiClub.data.id}`,
          })) as User;

          return { updatedStrapiUserClub, stripeCustomer };
        case Role.Sponsor:
          console.log('create sponsor');
          const newStrapiSponsor = (await this.sponsorService.create({
            name: createUserDto.name ?? '',
            address: createUserDto.address ?? '',
            phone: createUserDto.phone ?? '',
            description: createUserDto.description ?? '',
          })) as { data: Sponsor };

          const updatedStrapiUserSponsor = (await this.update(strapiUser.id, {
            stripe_customer_id: stripeCustomer.id,
            sponsor: `${newStrapiSponsor.data.id}`,
          })) as User;

          return { updatedStrapiUserSponsor, stripeCustomer };
        default:
          throw new BadRequestException('USER_ROLE is not correct !');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      throw new ForbiddenException(
        'You do not have PERMISSION to create a STRAPI_USER',
      );
    }
  }

  findAll() {
    try {
      return this.strapiService.getAllData('users', '*');
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new NotFoundException('No STRAPI_USERS found');
    }
  }

  findOne(id: string) {
    try {
      return this.strapiService.getDataById(`users/${id}`, '*');
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new NotFoundException(`STRAPI_USER with ID ${id} not found`);
    }
  }

  findOneByEmail(email: string) {
    try {
      return this.strapiService.getDataByField('users', 'email', email);
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new NotFoundException(`STRAPI_USER with EMAIL ${email} not found`);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.strapiService.updateData(`users/${id}`, updateUserDto);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new ForbiddenException(
        `You do not have permission to update STRAPI_USER with ID ${id} and CREDENTIALS ${JSON.stringify(updateUserDto)}`,
      );
    }
  }

  remove = async (id: string) => {
    try {
      const strapiUser = (await this.strapiService.getDataById(
        `users/${id}`,
        '*',
      )) as User;

      const stripeCustomer = await this.customerStripeService.retrieveCustomer(
        strapiUser.stripe_customer_id,
      );

      if (!stripeCustomer) {
        throw new NotFoundException(
          `STRIPE_CUSTOMER is not found with CUSTOMER_ID ${strapiUser.stripe_customer_id}`,
        );
      }

      if (strapiUser.stripe_customer_id === null) {
        throw new BadRequestException(`STRIPE_CUSTOMER_ID is null`);
      }

      if (strapiUser.player !== null) {
        const strapiPlayer = (await this.playerService.findOne(
          strapiUser.player.documentId,
        )) as { data: Player };

        await this.playerService.remove(strapiPlayer.data.documentId);
        const deletedStrapiUser = await this.strapiService.deleteData(
          `users/${strapiUser.id}`,
        );

        return { strapiPlayer, deletedStrapiUser };
      } else if (strapiUser.club !== null) {
        const strapiClub = (await this.clubService.findOne(
          strapiUser.club.documentId,
        )) as { data: Club };

        await this.clubService.remove(strapiClub.data.documentId);
        const deletedStrapiUser = await this.strapiService.deleteData(
          `users/${strapiUser.id}`,
        );

        return { strapiClub, deletedStrapiUser };
      } else if (strapiUser.sponsor !== null) {
        const strapiSponsor = (await this.sponsorService.findOne(
          strapiUser.sponsor.documentId,
        )) as { data: Sponsor };

        await this.sponsorService.remove(strapiSponsor.data.documentId);
        const deletedStrapiUser = await this.strapiService.deleteData(
          `users/${strapiUser.id}`,
        );
        return { strapiSponsor, deletedStrapiUser };
      } else {
        const deletedStrapiUser = await this.strapiService.deleteData(
          `users/${strapiUser.id}`,
        );
        return deletedStrapiUser;
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new ForbiddenException(
        `You do not have permission to delete STRAPI_USER with ID ${id}`,
      );
    }
  };
}
