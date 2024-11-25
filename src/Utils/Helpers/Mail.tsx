import qs from 'qs';
import {Linking} from 'react-native';
const sendEmail = async (to: string, subject: string, body: string) => {
  console.log('send email');
  let url = `mailto:${to}`;
  const query = qs.stringify({
    subject: subject,
    body: body,
  });

  if (query.length) {
    url += `?${query}`;
  }

  const canOpen = await Linking.canOpenURL(url);
  if (!canOpen) {
    console.log('can not open');
    throw new Error('Provided URL can not be handled');
  }
  console.log('open url');
  return Linking.openURL(url);
};

export default sendEmail;
