import Link from "next/link";

export default function CreateBlock() {
  return (
    <div>
      <Link href="/">Go back Home</Link>
      <form>
        <div>
          <input type="text" placeholder="Block Title" />
        </div>
        <textarea placeholder="your code goes here..."></textarea>
        <button>Create</button>
      </form>
    </div>
  );
}
