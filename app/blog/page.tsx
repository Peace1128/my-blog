"use client";

import {
  doc,
  getDoc,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore";
import firestore from "../firebase/firestore";

export default function Blog() {
  const upLoad = async (): Promise<void> => {
    try {
      const docRef = doc(firestore, "사용자", "4xUSa7SFlshWCMLhOy7U");
      const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("문서 데이터:", docSnap.data() as DocumentData); // 명시적 타입 캐스팅
      } else {
        console.log("문서가 존재하지 않습니다.");
      }
    } catch (error: unknown) {
      console.error("문서 가져오기 오류:", error);
    }
  };

  return (
    <div>
      <button onClick={upLoad}>얻어와랏</button>
    </div>
  );
}
