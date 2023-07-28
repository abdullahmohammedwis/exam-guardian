import { useParams } from 'react-router-dom';

const PublicExam = () => {
  const { examId } = useParams();

  return (
    <div>PublicExam {examId}</div>
  )
}

export default PublicExam