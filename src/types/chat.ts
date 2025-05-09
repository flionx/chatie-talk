export interface IChatMessage {
    type: TMessageAuthor,
    message: string
}

export type TMessageAuthor = 'bot' | 'user';