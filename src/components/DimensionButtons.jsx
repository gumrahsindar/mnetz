import { Button } from 'react-bootstrap'

function DimensionButtons({ handleScreen }) {
  return (
    <div className='mb-4 d-flex justify-content-center gap-5'>
      <Button variant='danger' onClick={handleScreen} value='3d'>
        3D
      </Button>{' '}
      <Button variant='info' onClick={handleScreen} value='2d'>
        2D
      </Button>{' '}
    </div>
  )
}

export default DimensionButtons
