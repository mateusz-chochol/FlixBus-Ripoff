import React from 'react';
import {
  Typography,
  Link,
} from '@material-ui/core';

const MyInfo: React.FC = () => {
  return (
    <>
      <Typography variant='h4' gutterBottom>
        About me
      </Typography>
      <Typography variant='subtitle1' gutterBottom>
        My name is Mateusz Chochół and I come from Poland. You can contact me via mail: <Link href='mailto:mch.priv@gmail.com'>mch.priv@gmail.com</Link>. Bus travel website is my "do all" project where I try to implement everything I know about web development, starting from frontend going through writing backend on firebase, tests in cypress and building CI/CD pipelines on Google Cloud Platform. The project is ongoing so not every mentioned thing has been done but that's only yet.
      </Typography>
    </>
  )
}

export default MyInfo;