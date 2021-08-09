interface CommentProps {
  employeeId: number;
  login: string;
  avatarUrl: string | null;
  postId: number;
  respondTo: number | null;
  text: string;
}

export default function Comment(props: CommentProps) {
  return (
    <div style={{ borderRadius: "16px", border: "solid 2px black" }}>
      {props.text}
    </div>
  );
}
