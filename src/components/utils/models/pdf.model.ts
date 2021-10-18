

export interface IHighlightPDF {
    link: IHighlightSentence[],
}

export interface IHighlightSentence {
    content: {
        text: string
    },
    positition: {
        boundingRect: IRects,
        rects: IRects[],
        pageNumber: number
    },
    commment: {
        text: string,
        emoji: string
    },
    id: string
}

export interface IRects {
    x1: Float32Array,
            x2: Float32Array,
            y1: Float32Array,
            y2: Float32Array,
            width: Float32Array,
            height: Float32Array
}