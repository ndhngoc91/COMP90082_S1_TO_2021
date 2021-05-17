import boto3

s3_client = boto3.client("s3")


def generate_image_url(image_key: str):
    try:
        return s3_client.generate_presigned_url("get_object",
                                                Params={"Bucket": "rocky-valley", "Key": image_key})
    except Exception:
        return None
