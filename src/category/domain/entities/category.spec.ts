import UniqueEntityId from "../../../shared/domain/unique-entity-id.vo";
import { Category, CategoryProperties } from "./category";

describe("Category Test", () => {
  test("constructor of category", () => {
    const objConstructor: CategoryProperties = {
      name: "Movie Test",
      description: "Description Test",
      is_active: true,
      created_at: new Date(),
    };

    const category = new Category(objConstructor);

    expect(category.props).toStrictEqual(objConstructor);
  });

  test("constructor of category with id field ", () => {
    type CategoryData = { props: CategoryProperties; id?: UniqueEntityId };

    const data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: new UniqueEntityId() },
    ];

    data.forEach((i) => {
      const category = new Category(i.props, i.id as any);
      expect(category.id).not.toBeNull();
      expect(category.id).toBeInstanceOf(UniqueEntityId);
    });

    const objConstructor: CategoryProperties = {
      name: "Movie Test",
    };

    const category = new Category(objConstructor);

    expect(category.id).not.toBeNull();
    expect(category.id).toBeInstanceOf(UniqueEntityId);
  });

  test("constructor of category without date", () => {
    const objConstructor: CategoryProperties = {
      name: "Movie Test",
      description: "Description Test",
      is_active: true,
    };

    const category = new Category(objConstructor);

    expect(category.props.created_at).toBeInstanceOf(Date);
  });

  test("constructor of category with is_activate false", () => {
    const objConstructor: CategoryProperties = {
      name: "Movie Test",
      description: "Description Test",
      is_active: false,
      created_at: new Date(),
    };

    const category = new Category(objConstructor);

    expect(category.props).toStrictEqual(objConstructor);
  });

  test("constructor of category just with required params", () => {
    const objConstructor: CategoryProperties = {
      name: "Other Movie Test",
    };

    const category = new Category(objConstructor);

    expect(category.props).toMatchObject(objConstructor);
  });
});
