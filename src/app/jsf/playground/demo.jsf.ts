import { JsfDefinition } from '@kalmia/jsf-common-es2015';

export const demoJsfDoc: JsfDefinition = {
  schema: {
    type      : 'object',
    properties: {
      username: {
        type     : 'string',
        title    : 'Username',
        maxLength: 8,
        required : true
      },
      gender  : {
        type   : 'string',
        title  : 'Gender',
        handler: {
          type  : 'common/dropdown',
          values: [
            { value: 'male', label: 'male' },
            { value: 'female', label: 'female' }
          ]
        }
      },
      age     : {
        type   : 'integer',
        title  : 'Age',
        minimum: 0
      }
    }
  },
  layout: {
    type : 'div',
    items: [
      { type: 'heading', level: 2, title: 'Hello world!' },
      { type: 'hr' },
      {
        type : 'row',
        items: [
          { type: 'col', sm: 6, items: [{ key: 'username' }] },
          { type: 'col', sm: 6, items: [{ key: 'age' }] },
        ]
      },
      {
        key: 'gender'
      },
      {
        type   : 'button',
        title  : 'Say hi',
        onClick: [
          {
            $eval: `
               if ($val.username) {
                  alert("Hello " + $val.username)
               }  else {
                  alert("Please enter username!")
               }`
          } as any
        ]
      }
    ]
  }
};
