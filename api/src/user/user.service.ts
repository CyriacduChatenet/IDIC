/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StrapiService } from '../strapi/strapi.service';
import { CustomerStripe } from '../stripe/classes/customer.stripe';

@Injectable()
export class UserService {
  constructor(
    private readonly strapiService: StrapiService,
    private readonly stripeCustomer: CustomerStripe,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const strapiUser = (await this.strapiService.postData(
        'users',
        createUserDto,
      )) as CreateUserDto;

      if (!strapiUser || !strapiUser.username) {
        throw new BadRequestException('Failed to create user in Strapi');
      }

      const stripeCustomer = await this.stripeCustomer.createCustomer(
        strapiUser.email,
        strapiUser.username,
      );

      if (!stripeCustomer || !stripeCustomer.id) {
        throw new BadRequestException('Failed to create customer in Stripe');
      }

      const updatedStrapiUser: {
        username: string;
        email: string;
        id: number;
        stripe_customer_id?: string;
      } = await this.strapiService.updateData(`users/${strapiUser.id}`, {
        stripe_customer_id: stripeCustomer.id,
      });

      if (!updatedStrapiUser || !updatedStrapiUser.stripe_customer_id) {
        throw new BadRequestException(
          'Failed to update Strapi user with Stripe ID',
        );
      }

      console.log('Strapi user updated with Stripe ID:', updatedStrapiUser);

      return updatedStrapiUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new ForbiddenException(
        'You do not have permission to create a user',
      );
    }
  }

  findAll() {
    try {
      return this.strapiService.getAllData('users', '*');
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new NotFoundException('No users found');
    }
  }

  findOne(id: number) {
    try {
      return this.strapiService.getDataById('users', id);
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  findOneByEmail(email: string) {
    try {
      return this.strapiService.getDataByField('users', 'email', email);
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new NotFoundException(`User with email ${email} not found`);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.strapiService.updateData(`users/${id}`, updateUserDto);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new ForbiddenException(
        `You do not have permission to update user with ID ${id}`,
      );
    }
  }

  remove = async (id: number) => {
    try {
      const user = await this.strapiService.getDataById('users', id);

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      const deletedStripeCustomer = await this.stripeCustomer.deleteCustomer(
        user.stripe_customer_id,
      );

      if (!deletedStripeCustomer) {
        throw new BadRequestException('Failed to delete customer in Stripe');
      }

      const strapiCustomer = await this.strapiService.deleteData(`users/${id}`);

      if (!strapiCustomer) {
        throw new BadRequestException('Failed to delete user in Strapi');
      }

      return {
        deletedStripeCustomer,
        strapiCustomer,
      };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new ForbiddenException(
        `You do not have permission to delete user with ID ${id}`,
      );
    }
  };
}
