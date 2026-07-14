export const authTemplates = {
  WELCOME: ({ name }) => ({
    title: "Welcome to Vital Drops",
    message: `Welcome, ${name}! Thank you for joining Vital Drops. Complete your profile and health information to start donating blood and help save lives.`,
  }),

  PASSWORD_CHANGED: ({ name }) => ({
    title: "Password Updated Successfully",
    message: `Hi ${name}, your account password has been changed successfully. If you did not perform this action, please reset your password immediately or contact support.`,
  }),
};
