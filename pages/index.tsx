// @ts-ignore
export default function Home({ timeZone }) {
  return (
    <div>
      <h1>User Time Zone</h1>
      <p>Your time zone is: {timeZone}</p>
    </div>
  );
}

// @ts-ignore
export async function getServerSideProps(context) {
  const req = context.req;
  const forwarded = req.headers['x-forwarded-for'];
  const ipAddress = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;

  //Fallback for local development where IP might be localhost
  if (ipAddress === '127.0.0.1' || ipAddress === '::1') {
    return {
      props: {
        timeZone: 'Local Development Time Zone'
      }
    };
  }

  const ipADD = '1.208.115.0'
  // Use a third-party service to get the timezone
  // const response = await fetch(`https://ipapi.co/${ipADD}/timezone/`);
  const response = await fetch(`https://ipapi.co/${ipAddress}/timezone/`);
  const timeZone = await response.text();

  // Pass the timezone to the page component
  return {
    props: {
      timeZone
    }
  };
}