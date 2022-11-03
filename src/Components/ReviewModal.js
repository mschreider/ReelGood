import React, { useEffect, useState } from "react";
import { Modal, Rating, Group, Button } from '@mantine/core';
import { ModalStyle } from '../Utilities/ComponentStyles'

function ReviewModal(props) {
    const [ratingValue, setRatingValue] = useState(0);
    const [rateDisabled, setRateDisabled] = useState(true)

    useEffect(() => {
        if (ratingValue > 0) {
            setRateDisabled(false)
        }
    }, [ratingValue])

    return (
        <Modal
            opened={props.show}
            onClose={() => props.close(false)}
            title='RATE THIS'
            sx={ModalStyle}
        >
            <div className="ratingModalContainer" >
                <div>{props.title}</div>
                <Rating size='md' value={ratingValue} onChange={(currValue) => setRatingValue(currValue)} count={10} fractions={2} />
                <Button color='yellow' disabled={rateDisabled}>Rate</Button>
            </div>
            
        </Modal> 
    )
}

export default ReviewModal