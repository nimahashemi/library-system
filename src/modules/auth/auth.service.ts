import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Auth, AuthDocument } from 'src/schemas/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
  }

  async login(email: string, password: string): Promise<Auth> {
    const user = await this.validateUser(email, password);
    const payload = { email: user.email, sub: user._id, role: user.role };
    const authUser = await this.authModel.findOne({ email });
    if (!authUser) {
      const auth = new this.authModel({
        user: user._id,
        email: user.email,
        token: this.jwtService.sign(payload),
      });
      return await auth.save();
    } else {
      authUser.token = this.jwtService.sign(payload);
      return await this.authModel.findByIdAndUpdate(authUser);
    }
  }

  async decodeToken(token: string): Promise<any> {
    return await this.jwtService.decode(token);
  }
}
