export interface DocumentI{
    title: string;
    content: string;
    hidden: boolean;
}

export class Note implements DocumentI{
    content: string;
    hidden: boolean;
    title: string;

    constructor(content: string, privacy: boolean, title: string) {
        this.title = title
        this.hidden = privacy
        this.content = content
    }
}

export class CreditedNote implements DocumentI{
    content: string;
    hidden: boolean;
    title: string;
    authorName: string;
    id?: bigint;
    authorid?: bigint;

    constructor(content: string, privacy: boolean, title: string, authorName: string, id?: bigint, authorId?: bigint) {
        this.title = title
        this.hidden = privacy
        this.content = content
        this.authorName = authorName
        this.authorid = authorId
        this.id = id
    }
}