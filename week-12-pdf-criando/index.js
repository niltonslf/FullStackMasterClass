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

const lines = []
lines.push([
  {
    text: "Nome",
    style: "header"
  },
  {
    text: "E-mail",
    style: "header"
  },
  {
    text: "Situação",
    style: "header"
  }
])

for (let i = 0; i < 300; i++) {
  let ativo = "Ativo"
  if (i % 2 == 0) {
    ativo = {
      text: "Inativo",
      style: "inativo"
    }
  }

  lines.push(["Nilton", "niltonrck@gmail.com", ativo])
}

const docDefinition = {
  content: [
    { text: "Fullstack Master" },
    {
      table: {
        widths: ["*", "*", 100],
        body: lines
      }
    }
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true
    },
    inativo: {
      color: "red"
    }
  }
}

const pdf = printer.createPdfKitDocument(docDefinition)
pdf.pipe(fs.createWriteStream("doc.pdf"))
pdf.end()
