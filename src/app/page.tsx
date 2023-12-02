import { cookies } from "next/headers";

export default function Page() {
  const cookieStore = cookies();
  return cookieStore.getAll().map((cookie) => (
    <div key={cookie.name}>
      <span>{cookie.name} </span>
      <span>{cookie.value}</span>
    </div>
  ));
}
