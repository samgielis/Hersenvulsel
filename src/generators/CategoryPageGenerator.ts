import { Actions, CreatePagesArgs } from 'gatsby';
import { resolve } from 'path';

type CategoryQueryData = {
    data: {
        site: {
            siteMetadata: {
                categories: string[];
            }
        }
    }
}

export function isCategoryQueryData(result: any): result is CategoryQueryData {
    return result?.data?.site?.siteMetadata?.categories?.length > 0;
}

async function createCategoryPage(
    actions: Actions,
    category: string,
): Promise<void> {
    const { createPage } = actions;
    const component = resolve('./src/templates/CategoryPage.tsx');

    if (!component) {
        throw new Error('Something went wrong generating Category pages');
    }

    // eslint-disable-next-line no-console
    console.log('Creating CategoryPage', category);

    const categoryThumbnailsRegex = `/(${category})\\/(\\S*)\\/main\\.(jpg|png)/`;
    console.log(categoryThumbnailsRegex)
    await createPage({
        path: category,
        component,
        context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            category,
            categoryRegex: `/\/${category}\//`,
            categoryThumbnailsRegex,
        },
    });
}

export async function createCategoryPages({
    actions,
    graphql,
}: CreatePagesArgs) {
    const result = await graphql(`
        query categories {
            site {
                siteMetadata {
                    categories
                }
            }
        }
    `);

    if (!result || !result.data || !isCategoryQueryData(result)) {
        return;
    }

    const categories = result.data.site.siteMetadata.categories;

    await Promise.all(
        categories.map((category) =>
            createCategoryPage(actions, category.replace(" ", "").toLowerCase())
        )
    );
}
