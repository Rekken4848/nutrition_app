import { UserStats } from "./user-stats.model";

export class UserWithStatsDto {
    id!: number;
    email!: string;
    username!: string;
    name!: string;
    last_name!: string;
    userStats!: UserStats;
}
