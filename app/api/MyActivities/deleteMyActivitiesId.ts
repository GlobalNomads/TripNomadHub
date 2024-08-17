/*
 * fetchInstance 삭제 이유: Delete하면 Code(204) No Content로 응답이 옵니다.
 * fetchInstance 안에서는 response가 오면 무조건 JSON parsing하도록 설정되어 있어서
 * 삭제가 성공했음에도 불구하고, 계속 오류 메시지가 뜹니다.
 * 그래서 우선 fetchInstance 빼고 삭제가 작동되도록 수정했습니다.
 */

"use server";

import { cookies } from "next/headers";

const deleteMyActivitiesId = async (activityId: number) => {
  const token = cookies().get("accessToken");
  const headers: HeadersInit = {
    Accept: "application/json",
    Authorization: token ? `Bearer ${token.value}` : "",
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/my-activities/${activityId}`, {
      method: "DELETE",
      headers: headers,
    });

    if (response.status === 204) {
      // 204 No Content: 성공적으로 삭제, 응답 본문 없음
      console.log("Activity successfully deleted, no content to parse.");
      return;
    } else if (response.status === 200) {
      // 200 OK: 성공적으로 삭제, 응답에 데이터 포함
      const data = await response.json();
      console.log("Activity successfully deleted:", data);
      return;
    } else if (!response.ok) {
      // 400, 403, 404 등 비정상적인 상태 코드에 대한 처리
      const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
      console.error("Deletion failed with status:", response.status);
      throw new Error(errorData.message || `Failed with status ${response.status}`);
    }
  } catch (error: any) {
    console.error("Error during deletion:", error);
    throw new Error(error.message || "서버 오류로 인해 삭제할 수 없습니다.");
  }
};

export default deleteMyActivitiesId;
