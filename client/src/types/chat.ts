export interface IChatMessage {
    id: string,
    type: TMessageAuthor,
    message: string
}

export type TMessageAuthor = 'bot' | 'user';