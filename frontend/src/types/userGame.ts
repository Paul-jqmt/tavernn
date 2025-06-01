export interface UserGame {
    gameId: string;
    gameName: string;
    gameLevel: GameLevel;
    icon?: string;
}

export type GameLevel = 'beginner' | 'intermediate' | 'advanced' | 'professional';