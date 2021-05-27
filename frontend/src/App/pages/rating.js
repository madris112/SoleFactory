import {React, useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import axios from 'axios'


const labels = {
  0.5: 'Useless+',
  1: 'Useless',
  1.5: 'Poor+',
  2: 'Poor',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

export default function Hrating(props) {
  //console.log(props)
  let initrate = 0;
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [prodrating, setProdRating] = useState(initrate);
  useEffect(() => {
    console.log("rating starts")
    const userInput = {
    prodid: props.location.state.prod_id
  }
    const header = {
      'Content-Type': 'Application/json'
    };
    axios.post('http://localhost:4000/product/getrating', userInput, { header } )
       .then(response => {
         console.log(JSON.stringify(response.data));
         setValue(response.data.prodrate);
         setProdRating(response.data.prodrate);
       });

  },[])
  function findrating(){
    const userInput = {
    prodid: props.location.state.prod_id
  }
    const header = {
      'Content-Type': 'Application/json'
    };
    axios.post('http://localhost:4000/product/getrating', userInput, { header } )
       .then(response => {
         console.log(JSON.stringify(response.data));
          setProdRating(response.data.prodrate);
       });
  }
  const classes = useStyles();
  return (
    <>
    <div className={classes.root}>

      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
          findrating();
          const userInput = {
          prodid: props.location.state.prod_id,
          rate: newValue
        }

        const header = {
          "Content-Type": "application/json"
        };

         axios.post('http://localhost:4000/product/rating',userInput, { header } )
            .then(response => {var newcnt =  response.data} );

        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}

    </div>
    <div> Current Rating <strong>{prodrating.toFixed(2)}</strong> out of <strong>5</strong><br/></div>
    </>
  );
}
