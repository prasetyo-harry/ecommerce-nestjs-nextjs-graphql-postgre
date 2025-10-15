import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private auth: AuthService) {}

  @Mutation(() => String, { name: 'login' })
  async login(@Args('email') email: string, @Args('password') password: string) {
    const res = await this.auth.login(email, password);
    if (!res) throw new Error('Invalid credentials');
    return res.accessToken;
  }

@Mutation(() => String, { name: 'register' })
async register(
  @Args('email') email: string, 
  @Args('password') password: string,
  @Args('role', { type: () => String, nullable: true }) role?: string,
) {
  const res = await this.auth.signUp(email, password, role || 'user');
  return res.accessToken;
}

}
