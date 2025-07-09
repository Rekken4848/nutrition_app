export class UserStats {
    id?: number;
    user_id!: { id: number };
    profile_image?: string; //base64
    age!: string;
    gender!: 'male' | 'female' | 'other' | 'prefer-not-to-say';
    height!: number;
    weight!: number;
    activity_level!: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
    fat_percentage!: number;
}