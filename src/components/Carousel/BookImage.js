export default function BookImage(props) {
  return (
    <img
      width={props.width ?? 175}
      height={props.width ?? 250}
      src={`https://bookself-thumbnails.s3.us-east-2.amazonaws.com/${props.bookId}.jpg`}
      onError={(error) => error.target.src=`${process.env.PUBLIC_URL}/no-cover.jpg`}
      alt={props.bookTitle}
    />
  );
}
