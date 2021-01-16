const JSON = {

  "schemaVersion": "1.0.0",
  "algorithmVersion": "1.0.0",
  "data": [
    {
      "language": {
        "code": "pt-BR",
        "friendlyName": "Português",
        "thumbName": "POR"
      },
      "genderInformations": {
        "inflection": true,
        "default": "Masculino",
        "names": [
          "Feminino",
          "Masculino"
        ],
      },
      "content":
      {
        "periodNames": [
          {
            "periodSize": 3,
            "singularName": "",
            "pluralName": "",
            "genderInflection": true
          },
          {
            "periodSize": 3,
            "singularName": "mil",
            "pluralName": "mil",
            "genderInflection": true
          },
          {
            "periodSize": 3,
            "singularName": "milhão",
            "pluralName": "milhões",
            "genderInflection": false
          },
          {
            "periodSize": 3,
            "singularName": "bilhão",
            "pluralName": "bilhões",
            "genderInflection": false
          },
          {
            "periodSize": 3,
            "singularName": "trilhão",
            "pluralName": "trilhões",
            "genderInflection": false
          },
          {
            "periodSize": 3,
            "singularName": "quatrilhão",
            "pluralName": "quatrilhões",
            "genderInflection": false
          },
          {
            "periodSize": 3,
            "singularName": "quintilhão",
            "pluralName": "quintilhões",
            "genderInflection": false
          },
          {
            "periodSize": 3,
            "singularName": "sextilhão",
            "pluralName": "sextilhões",
            "genderInflection": false
          },
          {
            "periodSize": 3,
            "singularName": "septilhão",
            "pluralName": "septilhões",
            "genderInflection": false
          },
          {
            "periodSize": 3,
            "singularName": "octilhão",
            "pluralName": "octilhões",
            "genderInflection": false
          },
          {
            "periodSize": 3,
            "singularName": "nonilhão",
            "pluralName": "nonilhões",
            "genderInflection": false
          },
          {
            "periodSize": 3,
            "singularName": "decilhão",
            "pluralName": "decilhões",
            "genderInflection": false
          }
        ],
        "ordinaryDigitNames": {
          "ones": {
            "genderInflection": true,
            "genderContents": [
              {
                "gender": "Masculino",
                "wordNumbers": [
                  "",
                  "um",
                  "dois",
                  "três",
                  "quatro",
                  "cinco",
                  "seis",
                  "sete",
                  "oito",
                  "nove"
                ]
              }, {
                "gender": "Feminino",
                "wordNumbers": [
                  "",
                  "uma",
                  "duas",
                  "três",
                  "quatro",
                  "cinco",
                  "seis",
                  "sete",
                  "oito",
                  "nove"
                ]

              }

            ]
          },
          "tens": {
            "genderInflection": false,
            "defaultContent":
            {
              "wordNumbers":
                [
                  "",
                  "dez",
                  "vinte",
                  "trinta",
                  "quarenta",
                  "cinquenta",
                  "sessenta",
                  "setenta",
                  "oitenta",
                  "noventa"
                ]
            }
          },
          "hundreds":
          {
            "genderInflection": true,
            "genderContents": [
              {
                "gender": "Masculino",
                "wordNumbers":
                  [
                    "",
                    "cento",
                    "duzentos",
                    "trezentos",
                    "quatrocentos",
                    "quinhentos",
                    "seiscentos",
                    "setecentos",
                    "oitocentos",
                    "novecentos"
                  ]
              },
              {
                "gender": "Feminino",
                "wordNumbers":
                  [
                    "",
                    "cento",
                    "duzentas",
                    "trezentas",
                    "quatrocentas",
                    "quinhentas",
                    "seiscentas",
                    "setecentas",
                    "oitocentas",
                    "novecentas"
                  ]
              }]
          }


        },
        "exceptions": {
          "wholeNumber": [{
            "number": 0,
            "wordNumber": "zero"
          }],
          "numberInsidePeriod": [{
            "number": 100,
            "wordNumber": "cem"
          }],
          "partialNumbers": {
            "tens": [
              {
                "number": 11,
                "wordNumber": "onze"
              },
              {
                "number": 12,
                "wordNumber": "doze"
              },
              {
                "number": 13,
                "wordNumber": "treze"
              },
              {
                "number": 14,
                "wordNumber": "quatorze"
              },
              {
                "number": 15,
                "wordNumber": "quinze"
              },
              {
                "number": 16,
                "wordNumber": "dezesseis"
              },
              {
                "number": 17,
                "wordNumber": "dezessete"
              },
              {
                "number": 18,
                "wordNumber": "dezoito"
              },
              {
                "number": 19,
                "wordNumber": "dezenove"
              }
            ],
            "periods": [{
              "periodIndex": 1,
              "periodNumber": 1,
              "wordNumber": "mil"
            }]
          }
        },
        "connectors": {

          "insidePeriod": " e ",
          "beforePeriodName": " ",
          "betweenPeriods": ", "
        }
      }
    }]
};

export { JSON }