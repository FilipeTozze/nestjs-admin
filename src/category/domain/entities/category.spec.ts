import UniqueEntityId from "../../../shared/domain/value-objects/unique-entity-id.vo";
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
      expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });
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

  test("should active a category", () => {
    const category = new Category({
      name: "Filmes",
      is_active: true,
    });
    category.activate();
    expect(category.is_active).toBeTruthy();
  });

  test("should disable a category", () => {
    const category = new Category({
      name: "Filmes",
      is_active: false,
    });
    category.deactivate();
    expect(category.is_active).toBeFalsy();
  });

  it("should update a category", () => {
    const category = new Category({ name: "Movie" });
    category.update("Documentary", "some description");
    expect(category.name).toBe("Documentary");
    expect(category.description).toBe("some description");
  });
});
