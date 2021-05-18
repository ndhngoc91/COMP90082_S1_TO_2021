import * as pdfMake from "pdfmake";
import moment from "moment";
import { rockyValleyLogoBase64 } from "./ReceiptExporter";

export const exportContract = (orderDetails) => {
    console.log(orderDetails);

    const startDate = orderDetails.order.start_date ? moment(orderDetails.order.start_date) : moment();
    const endDate = orderDetails.order.start_date ? moment(orderDetails.order.end_date) : moment();
    const interval = endDate.diff(startDate, "days") + 1;
    let totalPrice = 0;
    const dd = {
        content: [
            {
                stack: [
                    {
                        image: rockyValleyLogoBase64,
                        width: 300
                    },
                    { text: "SKI & BOARD HIRING CONTRACT" }
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
                            { text: "Renter: ", border: [false, false, false, false] },
                            {
                                text: `${orderDetails.order.customer_last_name}, ${orderDetails.order.customer_first_name}`,
                                border: [false, false, false, true]
                            },
                            { text: "", border: [false, false, false, false] },
                            { text: "", border: [false, false, false, false] }
                        ],
                        [
                            { text: "Phone: ", border: [false, false, false, false] },
                            { text: `${orderDetails.order.customer_phone}`, border: [false, false, false, true] },
                            { text: "Email: ", border: [false, false, false, false] },
                            { text: `${orderDetails.order.customer_email}`, border: [false, false, false, true] }
                        ],
                        [
                            { text: "Start Date: ", border: [false, false, false, false] },
                            {
                                text: `${startDate.format("YYYY MMM DD")}`,
                                border: [false, false, false, true]
                            },
                            { text: "End Date: ", border: [false, false, false, false] },
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
                    widths: ["auto", "*", 100, 70],
                    body: [
                        [
                            { text: "Customer Details", style: "tableHeader" },
                            { text: "Package Name", style: "tableHeader" },
                            { text: "Trail Type", style: "tableHeader" },
                            { text: "Price", style: "tableHeader" }
                        ],
                        ...((() => {
                            const packagesByGuest = orderDetails.packages.reduce((a, p) => {
                                if (!(p.guest_id in a)) {
                                    a[p.guest_id] = [];
                                }
                                a[p.guest_id].push(p);
                                return a;
                            }, {});
                            return Object.keys(packagesByGuest).reduce((a, guest_id) => {
                                const packages = packagesByGuest[guest_id];
                                const guestName = `${packages[0].guest_last_name}, ${packages[0].guest_first_name}`;
                                const packagesByOrderDetailId = packages.reduce((a, p) => {
                                    if (!(p.order_detail_id in a)) {
                                        a[p.order_detail_id] = []
                                    }
                                    a[p.order_detail_id].push(p);
                                    return a;
                                }, {});

                                const rows = Object.keys(packagesByOrderDetailId).reduce((a, orderDetailId) => {
                                    const p = packagesByOrderDetailId[orderDetailId][0];
                                    const price = p.Package.base_price + parseFloat(p.Package.price_levels.split(",")[interval - 1]);
                                    totalPrice += price;
                                    return a.concat([
                                        [
                                            "",
                                            p.Package.name,
                                            p.TrailType.name,
                                            `$${price.toFixed(2)}`
                                        ]
                                    ]).concat(p.Extra ? [
                                        ["", { text: "Extra Name", colSpan: 3, style: "tableHeader" }, "", ""],
                                        ...(packagesByOrderDetailId[orderDetailId].map((p) => {
                                            const price =
                                                p.Extra.base_price + parseFloat(p.Extra.price_levels.split(",")[interval - 1])
                                            totalPrice += price
                                            return [
                                                "",
                                                { text: `${p.Extra.name}`, colSpan: 2 }, "",
                                                `$${price.toFixed(2)}`
                                            ]
                                        }))
                                    ] : [])
                                }, []);
                                rows[0][0] = { text: guestName, rowSpan: rows.length };

                                return a.concat(rows);
                            }, []);
                        })()),
                        [{ text: "Total", colSpan: 3, style: "tableHeader" }, "", "", `$${totalPrice.toFixed(2)}`]
                    ]
                }
            },

            {
                stack: [
                    { text: "Please sign below" },
                    {

                        style: "tableExample",
                        table: {
                            widths: ["*", 10, "*"],
                            body: [
                                [
                                    { text: "Renter", border: [false, true, false, false] },
                                    { text: "", border: [false, false, false, false] },
                                    { text: "Staff", border: [false, true, false, false] }
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

    pdfMake.createPdf(dd).download();
}
