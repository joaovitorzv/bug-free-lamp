import { waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { rest, PathParams } from "msw";
import { setupServer } from "msw/node";

import { render, screen } from "../../test-utils";
import Network from "./index";
import { PostType } from "../../types/posts";
import { signup } from "../../actions/sessionSlice";
import { useDispatch } from "react-redux";

const mockPostsResponse = {
  count: 259,
  next: "http://dev.codeleap.co.uk/careers/?limit=10&offset=10",
  previous: null,
  results: [
    {
      id: 1234,
      username: "username1",
      created_datetime: "2022-03-31T16:40:41.581651Z",
      title: "post 1 title",
      content: "post 1 content",
    },
    {
      id: 4510,
      username: "username2",
      created_datetime: "2022-03-31T16:40:32.373655Z",
      title: "post 2 title",
      content: "post 2 content",
    },
  ],
};

const mockPost = {
  id: 2321,
  title: "happy post title",
  content: "happy post content",
  created_datetime: "2022-03-31T16:40:32.373655Z",
};

const mockSession = { username: "happyuser" };

const server = setupServer(
  rest.get("https://dev.codeleap.co.uk/careers/", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockPostsResponse));
  }),

  rest.post<Omit<PostType, "id" | "created_datetime">, PathParams, PostType>(
    "https://dev.codeleap.co.uk/careers/",
    (req, res, ctx) => {
      const { title, content, username } = req.body;

      return res(
        ctx.status(201),
        ctx.json({
          id: mockPost.id,
          title,
          content,
          created_datetime: mockPost.created_datetime,
          username,
        })
      );
    }
  ),

  rest.delete("https://dev.codeleap.co.uk/careers/:postId", (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  rest.patch<
    Omit<PostType, "created_datetime" | "id">,
    { postId: string },
    PostType
  >("https://dev.codeleap.co.uk/careers/:postId", (req, res, ctx) => {
    const { postId } = req.params;

    return res(
      ctx.status(200),
      ctx.json({
        id: Number(postId),
        username: mockSession.username,
        content: req.body.content || mockPost.content,
        title: req.body.title || mockPost.title,
        created_datetime: mockPost.created_datetime,
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const NetworkMock = () => {
  const dispatch = useDispatch();
  dispatch(signup(mockSession));

  return (
    <MemoryRouter>
      <Network />
    </MemoryRouter>
  );
};

describe("network page", () => {
  it("should render network page", () => {
    render(<NetworkMock />);

    expect(screen.getByTestId("network")).toBeInTheDocument();
  });

  it("should render posts", async () => {
    render(<NetworkMock />);

    const post = await screen.findByText(mockPostsResponse.results[0].title);
    expect(post).toBeInTheDocument();
  });

  it("should create a post", async () => {
    render(<NetworkMock />);

    userEvent.type(screen.getByTestId("create-input-title"), mockPost.title);
    userEvent.type(
      screen.getByTestId("create-input-content"),
      mockPost.content
    );
    userEvent.click(screen.getByText(/create/i));

    expect(
      await screen.findByText("@" + mockSession.username)
    ).toBeInTheDocument();
  });

  it("should edit a post", async () => {
    render(<NetworkMock />);

    const newTitle = " edited";

    const editButton = await screen.findByTestId("edit-post-btn");
    userEvent.click(editButton);

    const editInput = await screen.findByTestId("edit-title-input");
    userEvent.type(editInput, newTitle);

    const saveButton = screen.getByTestId("save-edit-btn");
    userEvent.click(saveButton);

    expect(
      await screen.findByText(mockPost.title + newTitle)
    ).toBeInTheDocument();
  });

  it("should delete a post", async () => {
    render(<NetworkMock />);

    const openDeleteModal = await screen.findByTestId("delete-dialog-btn");
    userEvent.click(openDeleteModal);

    const deletePostButton = await screen.findByTestId("delete-post-btn");
    userEvent.click(deletePostButton);

    await waitForElementToBeRemoved(() =>
      screen.queryByText(`@${mockSession.username}`)
    );
  });
});
