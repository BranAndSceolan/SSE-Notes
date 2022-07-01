export interface DocumentI{
    title: string;
    text: string;
    content: string;
    privacy: boolean;
}

export class Note implements DocumentI{
    content: string;
    privacy: boolean;
    text: string;
    title: string;

    constructor(content: string, privacy: boolean, text: string, title: string) {
        this.title = title
        this.privacy = privacy
        this.content = content
        this.text = text
    }
}

export class CreditedNote implements DocumentI{
    content: string;
    privacy: boolean;
    text: string;
    title: string;
    author: string;

    constructor(content: string, privacy: boolean, text: string, title: string, author: string) {
        this.title = title
        this.privacy = privacy
        this.content = content
        this.text = text
        this.author = author
    }
}