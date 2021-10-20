// import { IHighlightPDF } from '../utils/models/pdf.model';

import { IHighlight, Sentences } from "../pdf-highlighter"

export const convertHighlight = (input: any) => {
    // console.log("InsideConvert:", input.Result);
    const bRects = {
        x1: 215.620,
        y1: 34.790,
        x2: 90.147,
        y2: 104.067,
        width: 1019.9999999999999,
        height: 1319.9999999999998,
      }
    const url = 'https://duy-sieng-hoa.s3.ap-southeast-1.amazonaws.com/Documents/Test-Highlight.pdf'
    const output = {
        url: [] as any
    }
    input.Result.map((page:any, index:number) => {
        console.log("Page", page)
        const eachPage:any = []
        page.map((sen:any) => {
            console.log("Sen", sen)
            const eachSen = {
                content: {
                    text: sen.SenDB
                },
                position: {
                    boundingRect: bRects,
                    rects: sen.SenInputRect,
                    pageNumber: page.PageDB
                },
                comment: {
                    text: sen.Title,
                    emoji: ""
                },
                id: sen.id
            };
            eachPage.push(eachSen);
        })
        output.url.push(eachPage)
    })
    return output
}

export const convertSentenceHighlight = (input: Array<IHighlight>) => {
  // if (!input) return;
  const output: Array<Sentences> = [];
  input.map((doc:IHighlight) => {
    doc.sentences.map((sen: Sentences) => {
      output.push(sen);
    })
  });
  return output
}

export const txtHighlights = {
    'https://duy-sieng-hoa.s3.ap-southeast-1.amazonaws.com/Documents/Test-Highlight.pdf': [
        // {
        //   content: {
        //     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis varius elit, in rhoncus arcu. Sed eu nunc quis leo pharetra porta.",
        //   },
        //   position: {
        //     boundingRect: {
        //       x1: 215.620,
        //       y1: 234.790,
        //       x2: 367.477,
        //       y2: 396.140,
        //       width: 1019.9999999999999,
        //       height: 1319.9999999999998,
        //     },
        //     rects: [
        //       {
        //         x1: 215.620,
        //         y1: 234.790,
        //         x2: 367.477,
        //         y2: 396.140,
        //         width: 1518.857,
        //         height: 1319.9999999999998,
        //       },
        //     ],
        //     pageNumber: 1,
        //   },
        //   comment: {
        //     text: "Department of EDU",
        //     emoji: "😎",
        //   },
        //   id: "29668244118038056",
        // },
        {
            content: {
              text: "Để thực hiện gom cụm ta thường sử dụng thuật toán K-means, thuật toán SOM, độ đo tương tự Euclide.fgvdfjhg  kjhfkbdj bfv kjhtfbdkj fbdskj dfkjghdfjkgbdfxkjgbklj fdgjhdfjkgbdgbkjgtbhk éhgdfjkgbdjkgbrekg",
            },
            position: {
              boundingRect: {
                x1: 215.620,
                y1: 34.790,
                x2: 90.147,
                y2: 104.067,
                width: 1019.9999999999999,
                height: 1319.9999999999998,
              },
              rects:[{'x1': 405.5825, 'y1': 859.2282, 'x2': 478.9098, 'y2': 882.5562000000001, 'width': 1510, 'height': 1510}, {'x1': 451.55, 'y1': 859.2282, 'x2': 549.9468, 'y2': 882.5562000000001, 'width': 1510, 'height': 1510}, {'x1': 517.34, 'y1': 859.2282, 'x2': 618.975, 'y2': 882.5562000000001, 'width': 1510, 'height': 1510}, {'x1': 581.225, 'y1': 859.2282, 'x2': 689.9391, 'y2': 882.5562000000001, 'width': 1510, 'height': 1510}, {'x1': 646.9325000000001, 'y1': 859.2282, 'x2': 759.2751000000001, 'y2': 882.5562000000001, 'width': 1510, 'height': 1510}, {'x1': 711.1324999999999, 'y1': 859.2282, 'x2': 793.287, 'y2': 882.5562000000001, 'width': 1510, 'height': 1510}, {'x1': 742.625, 'y1': 859.2282, 'x2': 902.205, 'y2': 882.5562000000001, 'width': 1510, 'height': 1510}, {'x1': 843.4749999999999, 'y1': 859.2282, 'x2': 943.5258000000001, 'y2': 882.5562000000001, 'width': 1510, 'height': 1510}, {'x1': 881.875, 'y1': 859.2282, 'x2': 1022.4090000000001, 'y2': 882.5562000000001, 'width': 1510, 'height': 1510}, {'x1': 954.7750000000001, 'y1': 859.2282, 'x2': 1101.4731, 'y2': 882.5562000000001, 'width': 1510, 'height': 1510}, {'x1': 1027.9825, 'y1': 859.2282, 'x2': 1170.7578, 'y2': 882.5562000000001, 'width': 1510, 'height': 1510}, {'x1': 1092.135, 'y1': 859.2282, 'x2': 1314.7191, 'y2': 882.5562000000001, 'width': 1510, 'height': 1510}, {'x1': 1225.7224999999999, 'y1': 859.2282, 'x2': 1393.8020999999999, 'y2': 882.5562000000001, 'width': 1510, 'height': 1510}, {'x1': 180.06, 'y1': 888.3882, 'x2': 254.6964, 'y2': 911.7162000000001, 'width': 1510, 'height': 1510}, {'x1': 243.9175, 'y1': 888.3882, 'x2': 348.3324, 'y2': 911.7162000000001, 'width': 1510, 'height': 1510}, {'x1': 330.615, 'y1': 888.3882, 'x2': 392.09400000000005, 'y2': 911.7162000000001, 'width': 1510, 'height': 1510}, {'x1': 371.15000000000003, 'y1': 888.3882, 'x2': 435.834, 'y2': 911.7162000000001, 'width': 1510, 'height': 1510}, {'x1': 411.91, 'y1': 888.3882, 'x2': 527.4072000000001, 'y2': 911.7162000000001, 'width': 1510, 'height': 1510}, {'x1': 496.44, 'y1': 888.3882, 'x2': 565.0398, 'y2': 911.7162000000001, 'width': 1510, 'height': 1510}, {'x1': 531.425, 'y1': 888.3882, 'x2': 689.6151000000001, 'y2': 911.7162000000001, 'width': 1510, 'height': 1510}],
              pageNumber: 1,
            },
            comment: {
              text: "Hệ tư vấn cho học sinh chọn tổ hợp môn thi tốt nghiệp Trung học phổ thông Quốc Gia",
              emoji: "",
            },
            id: "29668244118038024",
          },
      ],
    };