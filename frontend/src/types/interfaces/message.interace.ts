export interface Message {
    id: string
    senderId: string,
    receiverId: string,
    text: string,
    image: string,
    createdAt: Date
}