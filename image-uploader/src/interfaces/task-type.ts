export interface TaskType {
    id: number | string;
    name: string;
    description: string;
    done: boolean;
    needby: string;
    storypoints: number;
    image1?: string;
    image2?: string;
    image3?: string;
}