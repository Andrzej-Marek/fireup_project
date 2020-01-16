import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

export const LoadingComponent: React.FC = () => {
  return (
    <div>
      <CircularProgress />
    </div>
  );
};
