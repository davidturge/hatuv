export const ACCOUNT_REGISTRATION_FORM_CONSTANTS = {
  companyName: {
    placeholder: 'שם החברה',
    validation: {
      required: 'שדה חובה'
    }
  },
  companyEmail: {
    placeholder: 'דוא"ל',
    validation: {
      required: 'שדה חובה',
      error: 'כתובת דוא"ל לא תקינה'
    }
  },
  phone: {
    placeholder: 'מספר טלפון',
    validation: {
      required: 'שדה חובה',
      error: 'מספר טלפון לא תקין'
    }
  },
  // mobile: {
  //   placeholder: 'מספר נייד',
  //   validation: {
  //     required: 'שדה חובה',
  //     error: 'מספר טלפון לא תקין'
  //   }
  // },
  // city: {
  //   placeholder: 'עיר',
  //   validation: {
  //     required: 'שדה חובה',
  //   }
  // },
  // street: {
  //   placeholder: 'רחוב',
  //   validation: {
  //     required: 'שדה חובה',
  //   }
  // },
  // houseNumber: {
  //   placeholder: 'מספר רחוב',
  //   validation: {
  //     required: 'שדה חובה',
  //   }
  // }
};

export const ACCOUNT_ACTIONS_MESSAGES_CONSTANTS = {
  success: {
    create: 'חשבון נוסף בהצלחה',
    update: 'חשבון עודכן בהצלחה',
    delete: 'חשבון הוסר בהצלחה',
    deleteMultiple: 'החשבונות הוסרו בהצלחה'
  },
  errors: {}
};

export const USER_REGISTRATION_FORM_CONSTANTS = {
  email: {
    placeholder: 'דוא"ל',
    validation: {
      required: 'שדה חובה',
      error: 'דוא"ל לא תקין'
    }
  },
  firstName: {
    placeholder: 'שם פרטי',
    validation: {
      required: 'שדה חובה'
    }
  },
  lastName: {
    placeholder: 'שם משפחה',
    validation: {
      required: 'שדה חובה'
    }
  },
  password: {
    placeholder: 'סיסמא',
    validation: {
      error: 'סיסמא חייבת להכיל 6 תווים, אות גדולה, אות קטנה ומספר',
      required: 'שדה חובה'
    }
  },
  confirmPassword: {
    placeholder: 'אימות סיסמא',
    validation: {
      required: 'שדה חובה',
      error: 'סיסמאות לא זהות'
    }
  }
};

export const USER_ACTIONS_MESSAGES_CONSTANTS = {
  success: {
    create: 'משתמש נוסף בהצלחה',
    update: 'משתמש עודכן בהצלחה',
    delete: 'משתמש הוסר בהצלחה',
    deleteMultiple: 'משתמשים הוסרו בהצלחה'
  },
  errors: {}
};
