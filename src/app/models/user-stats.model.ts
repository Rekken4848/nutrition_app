export class UserStats {
    id?: number;
    user_id!: { id: number };
    profile_image?: File;
    age!: string;
    gender!: 'male' | 'female' | 'other' | 'prefer-not-to-say';
    height!: number;
    weight!: number;
    activity_level!: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
    fat_percentage!: number;
}