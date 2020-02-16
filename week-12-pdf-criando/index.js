const PdfPrinter = require("pdfmake")
const fs = require("fs")

const fonts = {
  Roboto: {
    normal: "fonts/Roboto-Regular.ttf",
    bold: "fonts/Roboto-Bold.ttf",
    italics: "fonts/Roboto-Italic.ttf",
    bolditalics: "fonts/Roboto-BoldItalic.ttf"
  }
}

const printer = new PdfPrinter(fonts)
const docDefinition = {
  content: "Fullstack Master"
}

const pdf = printer.createPdfKitDocument(docDefinition)
pdf.pipe(fs.createWriteStream("doc.pdf"))
pdf.end()
