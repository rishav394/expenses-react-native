export const secrets = {
  spreadSheetId: process.env.spreadSheetId,
  // @ts-ignore
  private_key: process.env.private_key.replace(/\\n/g, "\n"),
  client_email: process.env.client_email
};
