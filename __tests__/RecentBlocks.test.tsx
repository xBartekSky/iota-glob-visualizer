import { RecentBlocks } from "../src/components/RecentBlocks";
import React from "react";
import { render } from "@testing-library/react-native";

describe("RecentBlocks Component", () => {
  it("should show waiting message when block list is empty", () => {
    const { getByText } = render(<RecentBlocks blocks={[]} />);

    expect(getByText("Waiting for blocks...")).toBeTruthy();
  });

  it("should render correct number of block cards when data is provided", () => {
    const mockBlocks = [
      {
        blockNumber: "100",
        validatorName: "Node A",
        round: "1",
        transactions: 5,
      },
      {
        blockNumber: "101",
        validatorName: "Node B",
        round: "1",
        transactions: 2,
      },
    ];

    const { getAllByText } = render(<RecentBlocks blocks={mockBlocks} />);

    const blockLabels = getAllByText("BLOCK");
    expect(blockLabels.length).toBe(2);
  });
});
