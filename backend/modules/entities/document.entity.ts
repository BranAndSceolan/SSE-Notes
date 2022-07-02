export interface DocumentI{
    title: string;
    content: string;
    privacy: boolean;
}

export class Note implements DocumentI{
    content: string;
    privacy: boolean;
    title: string;

    constructor(content: string, privacy: boolean, title: string) {
        this.title = title
        this.privacy = privacy
        this.content = content
    }
}

export class CreditedNote implements DocumentI{
    content: string;
    privacy: boolean;
    title: string;
    authorName: string;
    id?: bigint;
    authorId?: bigint;

    constructor(content: string, privacy: boolean, title: string, authorName: string, id?: bigint, authorId?: bigint) {
        this.title = title
        this.privacy = privacy
        this.content = content
        this.authorName = authorName
        this.authorId = authorId
        this.id = id
    }
}