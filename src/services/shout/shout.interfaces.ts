import { ImageId } from "@/domain/image";
import { ShoutId } from "@/domain/shout";
import { UserId } from "@/domain/user";

export interface ShoutDto {
  id: ShoutId;
  type: "shout";
  createdAt: number;
  attributes: {
    authorId: UserId;
    text: string;
    likes: number;
    reshouts: number;
    imageId?: ImageId;
  };
  relationships: {
    replies: ShoutId[];
    replyTo?: ShoutId;
  };
}

export interface CreateReplyParams {
  shoutId: ShoutId;
  replyId: ShoutId;
}

export type CreateReplyApi = (params: CreateReplyParams) => Promise<void>;

export interface CreateShoutParams {
  message: string;
  imageId?: ImageId;
}

export interface CreateShoutResponseDto {
  data: ShoutDto;
}

export type CreateShoutApi = (
  params: CreateShoutParams
) => Promise<CreateShoutResponseDto>;
