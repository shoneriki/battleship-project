import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import Toast from "../components/Toast";
import "@testing-library/jest-dom";

describe("Toast Component", () => {
  test("displays the message with correct styling and fades out", async () => {
    jest.useFakeTimers("modern");

    const message = "Test message";
    const type = "success";
    const duration = 1000;
    const animationTime = 300;

    const onRemove = jest.fn();

    render(
      <Toast
        message={message}
        duration={duration}
        onRemove={onRemove}
        type={type}
      />
    );

    const toastMessage = screen.getByText(message);
    expect(toastMessage).toHaveStyle(`background-color: #90ee90`);

    act(() => {
      jest.advanceTimersByTime(duration + animationTime);
    });

    await waitFor(() => {
      return !screen.queryByText(message);
    });

    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
