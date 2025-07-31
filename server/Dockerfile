FROM node:22.14.0-alpine
# Install production dependecies into container
WORKDIR /app
COPY package.json /app
RUN npm install --production
# Set Up Supabase Postgre database
COPY . /app
ENV DB_URL=<db-url>
RUN npm run setup-db
# Run the Server
ENV PORT=3000
ENV BCRYPT_SALT_ROUNDS=<salt-rounds>
ENV SECRET_TOKEN=<secret-token>
EXPOSE 3000
CMD npm start