import { User } from '@prisma/client';

export class UserPresenter {
  constructor(readonly user: User) {}

  toJSON() {
    return {
      id: this.user.id,
      email: this.user.email,
      roles: this.user.roles,
      created_at: this.user.created_at,
      updated_at: this.user.updated_at,
    };
  }
}
