import * as pdfMake from "pdfmake";
import moment from "moment";
import {rockyValleyLogoBase64} from "./ReceiptExporter";

export const exportContract = (contract) => {
    const startDate = moment();
    const endDate = moment();

    const data = [];
    contract.products.forEach(product => {
        data.push([
            product.id,
            {
                text: product.name,
                italics: true,
                color: "gray"
            },
            product.key_product_id
        ]);
    });

    const dd = {
        content: [
            {
                stack: [
                    {
                        image: rockyValleyLogoBase64,
                        width: 300
                    },
                    {text: "SKI & BOARD HIRING CONTRACT"}
                ],
                style: "header"
            },

            {
                style: "tableExample",
                table: {
                    widths: ["auto", "*", "auto", "auto"],
                    body: [
                        ["Owner: ", "Rocky Valley Bikes Snow Sports", "Phone: ", "03 5754 1118"],
                        ["", "226 Kiewa Valley Hwy,\nTawonga South VIC 3698", "Email: ", "info@rockyvalley.com.au"]
                    ]
                },
                layout: 'noBorders',
                margin: [0, 0, 0, 30],
            },
            {
                style: "tableExample",
                table: {
                    widths: ["auto", "*", "auto", "*"],
                    body: [
                        [
                            {text: "Renter: ", border: [false, false, false, false]},
                            {
                                text: `Ruby, Nguyen`,
                                border: [false, false, false, true]
                            },
                            {text: "", border: [false, false, false, false]},
                            {text: "", border: [false, false, false, false]}
                        ],
                        [
                            {text: "Phone: ", border: [false, false, false, false]},
                            {text: `0434117998`, border: [false, false, false, true]},
                            {text: "Email: ", border: [false, false, false, false]},
                            {text: `hongngocn@student.unimelb.edu.au`, border: [false, false, false, true]}
                        ],
                        [
                            {text: "Start: ", border: [false, false, false, false]},
                            {
                                text: `${startDate.format("YYYY MMM DD")}`,
                                border: [false, false, false, true]
                            },
                            {text: "End: ", border: [false, false, false, false]},
                            {
                                text: `${endDate.format("YYYY MMM DD")}`,
                                border: [false, false, false, true]
                            }
                        ],
                    ]
                },
                margin: [0, 0, 0, 30],
            },
            {
                style: "tableExample",
                table: {
                    widths: ["auto", "*", 100],
                    body: [
                        [
                            {text: "Id", style: "tableHeader"},
                            {text: "Name", style: "tableHeader"},
                            {text: "Key Product Id", style: "tableHeader"}
                        ],
                        ...data,
                        [{text: `Total Products: ${data.length}`, colSpan: 3, style: "tableHeader"}, "", ""]
                    ]
                }
            },
            {
                stack: [
                    {text: "Please sign below"},
                    {

                        style: "tableExample",
                        table: {
                            widths: ["*", 10, "*"],
                            body: [
                                [
                                    {text: "Renter", border: [false, true, false, false]},
                                    {text: "", border: [false, false, false, false]},
                                    {text: "Staff", border: [false, true, false, false]}
                                ],
                            ]
                        },
                        margin: [0, 50, 0, 0],
                    }
                ],
                margin: [0, 50, 0, 0],
            },
            {
                stack: [
                    {
                        text: "Rocky Valley",
                        italics: true,
                        color: "gray",
                        alignment: "right",
                        fontSize: 50,
                        margin: [0, 100, 0, 0]
                    },
                    {
                        text: `Melbourne, ${moment().format("MM-DD-YYYY HH:mm:ss")}`,
                        alignment: "right",
                        color: "gray",
                        fontSize: 20,
                        margin: [0, 10, 0, 0]
                    }
                ]
            }
        ],
        styles: {
            header: {
                fontSize: 30,
                bold: true,
                alignment: "center",
                margin: [0, 10, 0, 80]
            },
            subheader: {
                fontSize: 17
            },
            superMargin: {
                margin: [20, 0, 40, 0],
                fontSize: 15
            },
            floatLeft: {
                alignment: "left",
            },
            floatRight: {
                alignment: "right",
            },
            tableHeader: {
                bold: true
            }
        }
    };

    pdfMake.createPdf(dd).download("contract");
}
