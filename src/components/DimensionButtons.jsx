import { Button } from 'react-bootstrap'

function DimensionButtons({ handleScreen }) {
  return (
    <div className='d-flex justify-content-center gap-2'>
      <Button size='sm' variant='danger' onClick={handleScreen} value='3d'>
        3D
      </Button>{' '}
      <Button size='sm' variant='info' onClick={handleScreen} value='2d'>
        2D
      </Button>{' '}
    </div>
  )
}

export default DimensionButtons
