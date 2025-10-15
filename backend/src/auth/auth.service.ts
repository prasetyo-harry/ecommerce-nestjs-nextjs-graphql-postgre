import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async validate(email: string, pass: string) {
    const user = await this.users.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(pass, user.password);
    if (!match) return null;
    const { password, ...rest } = user as any;
    return rest;
  }

  async login(email: string, pass: string) {
    const user = await this.users.findByEmail(email);
    if (!user) return null;
    console.log({ user, passMatch: await bcrypt.compare(pass, user.password) });
    const match = await bcrypt.compare(pass, user.password);
    if (!match) return null;
    const payload = { sub: user.id, email: user.email, role: user.role };
    return { accessToken: this.jwt.sign(payload) };
    
  }

  async signUp(email: string, pass: string, role ='user') {
    const existing = await this.users.findByEmail(email);
    if (existing) throw new Error('User exists');
    const user = await this.users.create(email, pass,role);
    const payload = { sub: user.id, email: user.email, role: user.role };
    return { accessToken: this.jwt.sign(payload) };
  }
}
