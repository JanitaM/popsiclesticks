import React from 'react';
import { Button, Typography, Link, Paper, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Landing = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.heroImg}>
        <div className={classes.heroText}>
          <Typography variant='h3'>What Are You Doing Today?</Typography>
        </div>
      </div>
      {/* <Typography variant='h4' className={classes.whatIsTitle}>
        What Is Popsicle Sticks
      </Typography> */}
      <div className={classes.heroImg2}>
        <div className={classes.heroText2}>
          <Typography variant='h3'>2nd hero</Typography>
        </div>
      </div>

      <div className={classes.bodyContainer}>
        <Typography variant='h4' className={classes.whatIsTitle}>
          What Is Popsicle Sticks
        </Typography>
        <Typography variant='body1' className={classes.whatIsBody}>
          It's a way to keep track of your next adventure, date night, book,
          resturant, country, etc.
        </Typography>

        <Typography variant='body1' className={classes.whatIsBody}>
          If you Googled{' '}
          <span>
            "
            <Link
              href='https://www.google.com/search?q=popsicle+sticks+mason+jar&rlz=1C1SQJL_enUS806US806&oq=popsicle+sticks+mason+jar&aqs=chrome..69i57j0.6913j0j7&sourceid=chrome&ie=UTF-8'
              color='secondary'
            >
              {'popsicle sticks mason jar'}
            </Link>
          </span>
          " you'll find creative ideas of keeping a bucket list.
        </Typography>
        <Typography variant='body1' className={classes.whatIsBody}>
          But technology rules and ...{' '}
        </Typography>
        <p className={classes.whatIsBody}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, alias.
          Tempore, enim nemo! Culpa, dicta esse hic soluta non eaqu Lorem ipsum,
          dolor sit amet consectetur adipisicing elit. Ex, alias. Tempore, enim
          nemo! Culpa, dicta esse hic soluta non eaqu Lorem ipsum, dolor sit
          amet consectetur adipisicing elit. Ex, alias. Tempore, enim nemo!
          Culpa, dicta esse hic soluta non eaqu Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Ex, alias. Tempore, enim nemo! Culpa,
          dicta esse hic soluta non eaqu Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Ex, alias. Tempore, enim nemo! Culpa, dicta esse hic
          soluta non eaqu Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Ex, alias. Tempore, enim nemo! Culpa, dicta esse hic soluta non
          eaqu Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex,
          alias. Tempore, enim nemo! Culpa, dicta esse hic soluta non eaqu Lorem
          ipsum, dolor sit amet consectetur adipisicing elit. Ex, alias.
          Tempore, enim nemo! Culpa, dicta esse hic soluta non eaqu Lorem ipsum,
          dolor sit amet consectetur adipisicing elit. Ex, alias. Tempore, enim
          nemo! Culpa, dicta esse hic soluta non eaqu Lorem ipsum, dolor sit
          amet consectetur adipisicing elit. Ex, alias. Tempore, enim nemo!
          Culpa, dicta esse hic soluta non eaqu Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Ex, alias. Tempore, enim nemo! Culpa,
          dicta esse hic soluta non eaqu Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Ex, alias. Tempore, enim nemo! Culpa, dicta esse hic
          soluta non eaqu Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Ex, alias. Tempore, enim nemo! Culpa, dicta esse hic soluta non
          eaqu Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex,
          alias. Tempore, enim nemo! Culpa, dicta esse hic soluta non eaqu Lorem
          ipsum, dolor sit amet consectetur adipisicing elit. Ex, alias.
          Tempore, enim nemo! Culpa, dicta esse hic soluta non eaqu Lorem ipsum,
          dolor sit amet consectetur adipisicing elit. Ex, alias. Tempore, enim
          nemo! Culpa, dicta esse hic soluta non eaqu Lorem ipsum, dolor sit
          amet consectetur adipisicing elit. Ex, alias. Tempore, enim nemo!
          Culpa, dicta esse hic soluta non eaqu Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Ex, alias. Tempore, enim nemo! Culpa,
          dicta esse hic soluta non eaqu Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Ex, alias. Tempore, enim nemo! Culpa, dicta esse hic
          soluta non eaqu Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Ex, alias. Tempore, enim nemo! Culpa, dicta esse hic soluta non
          eaqu Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex,
          alias. Tempore, enim nemo! Culpa, dicta esse hic soluta non eaqu Lorem
          ipsum, dolor sit amet consectetur adipisicing elit. Ex, alias.
          Tempore, enim nemo! Culpa, dicta esse hic soluta non eaqu
        </p>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    color: '#023E4F'
  },
  heroImg: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background:
      'rgba(0,0,0,0.2) url("https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundBlendMode: 'overlay'
  },
  heroText: {
    textAlign: 'center',
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  heroImg2: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background:
      'rgba(0,0,0,0.2) url("https://images.pexels.com/photos/2542012/pexels-photo-2542012.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundBlendMode: 'overlay'
  },
  heroText2: {
    textAlign: 'center',
    position: 'absolute',
    top: 'calc(100vh-30%)',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  bodyContainer: {
    maxWidth: '90vw',
    margin: '0 auto'
  },
  whatIsTitle: {
    marginTop: '2rem',
    textAlign: 'center'
  },
  whatIsBody: {
    marginTop: '1rem',
    textAlign: 'center'
  }
});

export default Landing;
